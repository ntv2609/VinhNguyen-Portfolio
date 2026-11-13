import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUTPUT_FILE = ROOT / "tat_ca_code_cu.txt"

# Các thư mục build/cache/thiếu hiệu quả phải loại trừ khỏi đầu vào AI
EXCLUDE_DIRS = {
    ".git",
    ".next",
    "node_modules",
    "dist",
    "build",
    "out",
    "coverage",
    "__pycache__",
    ".pytest_cache",
    ".mypy_cache",
    ".venv",
    "venv",
    ".idea",
    ".vscode",
    "uploads",
    "public/uploads",
    ".cache",
    "tmp",
    "temp",
    "cache",
}

# Các file không nên đưa vào bản gom code để tránh lộ bí mật hoặc tạp chất build
EXCLUDE_FILES = {
    "geminiModelName",
    "gop_code.py",
    "tach_code.py",
    "code_moi.md",
    "tat_ca_code_cu.txt",
    "LMS.json",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
    ".DS_Store",
    "Thumbs.db",
}

# Chỉ giữ file source/code thực sự cần đọc cho AI/maintain project
VALID_EXTENSIONS = {
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".css",
    ".scss",
    ".ejs",
    ".html",
}


def should_exclude_dir(path: Path) -> bool:
    rel_parts = path.relative_to(ROOT).parts if path.is_absolute() else path.parts
    return any(part in EXCLUDE_DIRS for part in rel_parts)


def should_exclude_file(file_name: str) -> bool:
    if file_name in EXCLUDE_FILES:
        return True
    if file_name.startswith(".env"):
        return True
    if file_name.endswith(".log"):
        return True
    if file_name.endswith(".lock"):
        return True
    return False


def should_include_file(file_path: Path) -> bool:
    if file_path.name in {"package-lock.json", "yarn.lock", "pnpm-lock.yaml"}:
        return False
    if should_exclude_file(file_path.name):
        return False
    if file_path.suffix.lower() not in VALID_EXTENSIONS:
        return False
    return True


collected = []
for current_root, dirs, files in os.walk(ROOT):
    current_path = Path(current_root)
    # Xóa các thư mục bỏ qua
    dirs[:] = [
        d for d in dirs
        if d not in EXCLUDE_DIRS and not d.startswith(".")
    ]

    for file_name in files:
        file_path = current_path / file_name
        rel_path = file_path.relative_to(ROOT)

        if should_exclude_file(file_name):
            continue

        if any(part in EXCLUDE_DIRS for part in rel_path.parts[:-1]):
            continue

        if not should_include_file(file_path):
            continue

        try:
            text = file_path.read_text(encoding="utf-8")
            collected.append((str(rel_path).replace("\\", "/"), text))
        except UnicodeDecodeError:
            try:
                text = file_path.read_text(encoding="utf-8", errors="replace")
                collected.append((str(rel_path).replace("\\", "/"), text))
            except Exception as exc:
                print(f"⚠️ Bỏ qua file không đọc được: {rel_path} ({exc})")
        except Exception as exc:
            print(f"⚠️ Lỗi khi đọc file: {rel_path} ({exc})")

# Sắp xếp file để output ổn định, dễ đọc và dễ đối chiếu
collected.sort(key=lambda item: item[0].lower())

with OUTPUT_FILE.open("w", encoding="utf-8") as output:
    for rel_path, content in collected:
        output.write(f"\n# File: {rel_path}\n")
        output.write(content.rstrip())
        output.write("\n\n")

print(f"✅ Đã gom {len(collected)} file code sạch vào: {OUTPUT_FILE.name}")
print("📁 Thư mục được giữ lại: client/, server/")
print("🚫 Đã bỏ qua: .git, .next, node_modules, .env, lockfile, build/cache")

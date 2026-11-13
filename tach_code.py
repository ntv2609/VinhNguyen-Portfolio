import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE_FILE = ROOT / "code_moi.md"

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
    "cache",
    "tmp",
    "temp",
    "uploads",
    "public/uploads",
}

EXCLUDE_FILES = {
    "gop_code.py",
    "tach_code.py",
    "tat_ca_code_cu.txt",
    "code_moi.md",
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
}


def clean_markdown_code(text: str) -> str:
    text = re.sub(r"^```[A-Za-z0-9_-]*\n", "", text, count=1)
    text = re.sub(r"\n```\s*$", "", text, count=1)
    text = text.strip()
    return text


def is_safe_output_path(target_path: Path) -> bool:
    resolved_root = ROOT.resolve()
    resolved_target = target_path.resolve(strict=False)
    try:
        resolved_target.relative_to(resolved_root)
        return True
    except ValueError:
        return False


if not SOURCE_FILE.exists():
    raise FileNotFoundError(f"Không tìm thấy file nguồn: {SOURCE_FILE}")

content = SOURCE_FILE.read_text(encoding="utf-8")
parts = re.split(r"(?m)^# File:\s*", content)
restored = 0
skipped = 0

for part in parts[1:]:
    lines = part.splitlines()
    if not lines:
        skipped += 1
        continue

    file_path = lines[0].strip().strip("`").strip()
    code = "\n".join(lines[1:])
    code = clean_markdown_code(code)

    if not file_path or file_path == ".":
        skipped += 1
        continue

    file_path = file_path.replace("\\", "/").lstrip("./")
    if file_path.startswith("../") or file_path.startswith("/"):
        skipped += 1
        continue

    name = Path(file_path).name
    if name in EXCLUDE_FILES:
        skipped += 1
        continue

    if any(part_name in EXCLUDE_DIRS for part_name in Path(file_path).parts[:-1]):
        skipped += 1
        continue

    output_path = (ROOT / file_path).resolve(strict=False)
    if not is_safe_output_path(output_path):
        skipped += 1
        continue

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(code, encoding="utf-8")
    restored += 1

print(f"✅ Đã khôi phục {restored} file từ {SOURCE_FILE.name}.")
print(f"⚠️ Bỏ qua {skipped} block không hợp lệ hoặc file nhạy cảm.")

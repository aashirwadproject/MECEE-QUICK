import json

def create_ts(path, varname, questions):
    with open(path, "w", encoding="utf-8") as f:
        f.write("import { Question } from '../../types';\n\n")
        f.write(f"export const {varname}: Question[] = [\n")
        for q in questions:
            f.write("  " + json.dumps(q, ensure_ascii=False) + ",\n")
        f.write("];\n")

print("Zoology generator helper ready")

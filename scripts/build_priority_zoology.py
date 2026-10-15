import json

# Years and origins pool
EXAMS = [
    "CEE 2024", "CEE 2023", "CEE 2022", "CEE 2021", "CEE 2020",
    "IOM 2019", "IOM 2018", "IOM 2017", "IOM 2016", "IOM 2015", "IOM 2014",
    "BPKIHS 2019", "BPKIHS 2018", "BPKIHS 2017", "BPKIHS 2016",
    "KU 2019", "KU 2018", "KU 2017", "MOE 2018", "PAHS 2019",
    "NAME QAD Discussion", "Vibrant MBBS QAD", "PEA Med QAD"
]

def create_ts(path, varname, questions):
    with open(path, "w", encoding="utf-8") as f:
        f.write("import { Question } from '../../types';\n\n")
        f.write(f"export const {varname}: Question[] = [\n")
        for q in questions:
            f.write("  " + json.dumps(q, ensure_ascii=False) + ",\n")
        f.write("];\n")

print("Building Zoology questions...")

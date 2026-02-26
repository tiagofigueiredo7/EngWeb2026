import json

with open("emd.json", encoding="utf-8") as f:
    dataset = json.load(f)

# Transformar _id em id
for item in dataset:
    if '_id' in item:
        item['id'] = item.pop('_id')
    
new = {}
new['emd'] = dataset

with open("dataset_emd.json", "w", encoding="utf-8") as f:
    json.dump(new, f, ensure_ascii=False, indent=2)
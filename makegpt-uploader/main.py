import pandas as pd
import uuid
import requests
import json

file_path = "../content-for-make-gpt.xlsx"
makegpt_endpoint_ingest = "https://q9fa503px3.execute-api.ap-southeast-2.amazonaws.com/prod/ingest"
column_names = ['url', 'headings', 'paragraph', 'uuid', 'tokens', 'embeddings']

df = pd.read_excel(file_path, header=None, names=column_names, engine='openpyxl')
edited_records = []
total_rows = len(df)
for index, row in df.iterrows():
    if pd.isna(row["uuid"]):
        row["uuid"] = str(uuid.uuid4())
    data = {
        "uuid": row["uuid"],
        'urls': list(map(lambda x: f"https://makegpt.saad-ahmad.com{x}", [row['url']])),
        'headings': [row['headings']],
        'paragraph': row["paragraph"]
    }
    try:
        response = requests.post(makegpt_endpoint_ingest, json=data)
        response_dict = dict()
        if response.status_code // 100 == 2:
            response_dict = response.json()
            data["embeddings"] = response_dict["embeddings"]
            data["tokens"] = response_dict["tokens"]
            edited_records.append([
                data["urls"],
                data["headings"],
                data["paragraph"],
                data["uuid"],
                data["tokens"],
                data["embeddings"]
            ])
        else:
            response_dict = {"status": f"Request failed with status code {response.status_code}"}
        print(f"{index + 1}/{total_rows}:{((index + 1)/total_rows * 100)}% -- data synced -- {str(response_dict.get('timeElapsedMS', ''))}")
    except Exception as e:
        print('error', e, row)
    

pd.DataFrame(edited_records, columns=column_names).to_excel("./edited-content-for-make-gpt.xlsx", index=False, header=False, engine='openpyxl')


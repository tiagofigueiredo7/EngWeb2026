import json

with open("cinema.json", encoding='utf-8') as f:
    data = json.load(f)

for index, filme in enumerate(data['filmes'], start=1):
    filme['id'] = index

# Lista dos atores para adicionar ao JSON
atores = {}
for filme in data['filmes']:
    for ator in filme['cast']:
        if ator not in atores:
            atores[ator] = {
                'id': len(atores) + 1,
                'name': ator,
                'films': []
            }
        atores[ator]['films'].append({
            'id': filme['id'],
            'title': filme['title']
        })

data['atores'] = list(atores.values())

# Lista dos géneros para adicionar ao JSON
generos = {}
for filme in data['filmes']:
    for genero in filme['genres']:
        if genero not in generos:
            generos[genero] = {
                'id': len(generos) + 1,
                'name': genero,
                'films': []
            }
        generos[genero]['films'].append({
            'id': filme['id'],
            'title': filme['title']
        })

data['generos'] = list(generos.values())

with open("cinema.json", 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

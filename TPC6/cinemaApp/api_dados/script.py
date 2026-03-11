import json

# Carregar o dataset original
with open("cinema.json", encoding='utf-8') as f:
    data = json.load(f)

# Adicionar IDs aos filmes
for index, filme in enumerate(data['filmes'], start=1):
    filme['id'] = index

# Criar coleção de atores
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

# Criar coleção de géneros
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

# Guardar cada coleção num ficheiro separado (formato MongoDB)
with open("filmes.json", 'w', encoding='utf-8') as f:
    json.dump(data['filmes'], f, ensure_ascii=False, indent=2)

with open("atores.json", 'w', encoding='utf-8') as f:
    json.dump(list(atores.values()), f, ensure_ascii=False, indent=2)

with open("generos.json", 'w', encoding='utf-8') as f:
    json.dump(list(generos.values()), f, ensure_ascii=False, indent=2)

print("✓ Ficheiros criados: filmes.json, atores.json, generos.json")

# Comandos para importar as coleções no MongoDB:
# mongoimport --db cinema --collection filmes --file filmes.json --jsonArray
# mongoimport --db cinema --collection atores --file atores.json --jsonArray
# mongoimport --db cinema --collection generos --file generos.json --jsonArray

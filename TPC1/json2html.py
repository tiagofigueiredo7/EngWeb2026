import json, os, shutil

# funcao para abrir o dataset json
def open_json(filename):
    with open(filename, encoding="utf-8") as f:
        data = json.load(f)
    return data

# funcao para criar uma pasta dado um caminho
def mk_dir(relative_path):
    if not os.path.exists(relative_path):
        os.mkdir(relative_path)
    else:
        shutil.rmtree(relative_path)
        os.mkdir(relative_path)
        
# funcao para criar um ficheiro dado o nome e conteudo
def new_file(filename, content):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
 
#----------Pré calculo de algumas coisas----------

# Abrir as pastas necessárias
mk_dir("output")
mk_dir("./output/reparacoes")
mk_dir("./output/intervencoes")
mk_dir("./output/marcas")

dataset_reparacoes = open_json("reparacoes.json")

links_reparacoes = ""
links_intervencoes = ""
links_marcas = ""

# dicionário das intervenções
dic_interv = {}

count = 1
for rep in dataset_reparacoes["reparacoes"]:
    #----------Lista de Reparações----------
    links_reparacoes += f'''
    <li>
        <a href="./reparacoes/reparacao{count}.html">Reparação-{count}</a>
    </li>
    '''
    
    #----------Página Individual das Reparações----------
    html_ind_rep = f'''
    <html>
        <head>
            <title>Reparação-{count}</title>
            <meta charet="utf-8"/>
        </head>
        <body>
            <h3>Dados da reparação-{count}:</h3>
            <ul>
                <li><strong>Data: </strong>{rep["data"]}</li>
                <li><strong>NIF: </strong>{rep["nif"]}</li>
                <li><strong>Nome: </strong>{rep["nome"]}</li>
                <li><strong>Marca: </strong>{(rep["viatura"])["marca"]}</li>
                <li><strong>Modelo: </strong>{(rep["viatura"])["modelo"]}</li>
                <li><strong>Número de intervenções: </strong>{rep["nr_intervencoes"]}</li>
            </ul>
            <hr/>
            <address>
                <a href="../reparacoes.html">Voltar à Página das Reparações</a>
            </address>
        </body>
    </html>
    '''
    new_file(f"./output/reparacoes/reparacao{count}.html", html_ind_rep)
    
    # percorrer as intervenções para prencher o dicionário
    for i in rep["intervencoes"]:
        if i["codigo"] not in dic_interv:
            new_dic = {
                "codigo": i["codigo"],
                "nome": i["nome"],
                "descricao": i["descricao"],
                "reparacoes": [count]
            }
            dic_interv[i["codigo"]] = new_dic
        else:
            dic_interv[i["codigo"]]["reparacoes"].append(count)
            
    count+=1
    
dic_interv = dict(sorted(dic_interv.items()))

for key in dic_interv:
    interv = dic_interv[key]
    
    #----------Lista de Intervenções----------
    links_intervencoes += f'''
    <li>
        <a href="./intervencoes/intervencao{interv["codigo"]}.html">{interv["codigo"]}</a>
    </li>
    '''
    
    #----------Página Individual das Intervenções----------
    reparacoes_links = ""
    for rep in interv["reparacoes"]:
        reparacoes_links += f'''
        <li>
            <a href="../reparacoes/reparacao{rep}.html">Reparação-{rep}</a>
        </li>
        '''
    
    html_ind_interv = f'''
    <html>
        <head>
            <title>Intervenção-{interv["codigo"]}</title>
            <meta charet="utf-8"/>
        </head>
        <body>
            <h3>Dados da intervenção-{interv["codigo"]}:</h3>
            <ul>
                <li><strong>Código: </strong>{interv["codigo"]}</li>
                <li><strong>Nome: </strong>{interv["nome"]}</li>
                <li><strong>Descrição: </strong>{interv["descricao"]}</li>
                <li><strong>Reparações onde foi realizada: </strong>
                    <ul>
                        {reparacoes_links}
                    </ul>
                </li>
            </ul>
            <hr/>
            <address>
                <a href="../intervencoes.html">Voltar à Página das Intervenções</a>
            </address>
        </body>
    </html>
    '''
    new_file(f"./output/intervencoes/intervencao{interv['codigo']}.html", html_ind_interv)

#----------Página principal----------
html_principal ='''
<html>
    <head>
        <title>Intervenções numa oficina automóvel</title>
        <meta charet="utf-8"/>
    </head>
    <body>
        <h3>Dados consultáveis:</h3>
        <ul>
             <li>
                <a href="reparacoes.html">Listagem de Reparações</a>
            </li>
             <li>
                <a href="intervencoes.html">Listagem dos tipos de intervenção</a>
            </li>
             <li>
                <a href="marcas.html">Listagem das marcas e modelos dos carros intervencionados</a>
            </li>
        </ul>
    </body>
</html>
'''

new_file("./output/index.html", html_principal)

#----------Página das Reparações----------
html_reparacoes =f'''
<html>
    <head>
        <title>Página das Reparações</title>
        <meta charet="utf-8"/>
    </head>
    <body>
        <h3>Listagem de Reparações:</h3>
        <ul>
            {links_reparacoes}
        </ul>
        <hr/>
        <address>
            <a href="index.html">Voltar ao Índice</a>
        </address>
    </body>
</html>
'''

new_file("./output/reparacoes.html", html_reparacoes)

#----------Página das Intervenções----------
html_intervencoes =f'''
<html>
    <head>
        <title>Página das Intervenções</title>
        <meta charet="utf-8"/>
    </head>
    <body>
        <h3>Listagem dos tipos de intervenção:</h3>
        <ul>
            {links_intervencoes}
        </ul>
        <hr/>
        <address>
            <a href="index.html">Voltar ao Índice</a>
        </address>
    </body>
</html>
'''

new_file("./output/intervencoes.html", html_intervencoes)

#----------Página das Marcas----------
html_marcas =f'''
<html>
    <head>
        <title>Página das Marcas</title>
        <meta charet="utf-8"/>
    </head>
    <body>
        <h3>Listagem das marcas e modelos dos carros intervencionados:</h3>
        <ul>
            {links_marcas}
        </ul>
        <hr/>
        <address>
            <a href="index.html">Voltar ao Índice</a>
        </address>
    </body>
</html>
'''

new_file("./output/marcas.html", html_marcas)

# Desafio: Crie um monitorador de estoque. 
# Instruções: Use um laço while True para pedir ao usuário que insira o nome de um item e a quantidade.
# Se ele digitar "sair", use o comando break.
# Armazene os itens em um Dicionário, usando o nome como chave e a quantidade como valor

stock = {}

while True:
    product = input("Type the product (or 'exit' to exit the app):  ")
    if product.lower() == 'exit':
        break
    try:
        qtt = int(input(f"Type the {product} quantity:  "))
        stock[product] = qtt
    except ValueError:
        print("Error: please type a number for the quantity")

print("Final stock: ", stock)
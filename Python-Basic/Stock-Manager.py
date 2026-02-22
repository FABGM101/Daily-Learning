# Desafio: Crie um monitorador de estoque. 
# Instruções: Use um laço while True para pedir ao usuário que insira o nome de um item e a quantidade.
# Se ele digitar "sair", use o comando break.
# Armazene os itens em um Dicionário, usando o nome como chave e a quantidade como valor
from tabulate import tabulate as tb
RED = "\033[31m"
BOLD = "\033[1m"
RESET = "\033[0m"

stock = {}

while True:
    product = input(f"{BOLD}Type the product{RESET} (or 'exit' to exit the app){BOLD}:{RESET}  ")
    if product.lower() == 'exit':
        break
    try:
        qtt = int(input(f"Type the {product} quantity:  "))
        stock[product] = qtt
    except ValueError:
        print(f"{RED}Error{RESET}: please type a number for the quantity")

print(tb(stock.items(), headers=["Prod.", "Amount"]))
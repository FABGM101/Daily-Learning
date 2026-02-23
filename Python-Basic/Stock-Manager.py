from tabulate import tabulate as tb
table_data = [] # Creates a list to make the dictionary data work with tabulate.

# Variables for output formatting.
RED = "\033[31m" 
BOLD = "\033[1m" 
RESET = "\033[0m"

# The actual dictionary.
stock = {}

# Nested while function for data gathering.
while True:
    product = input(f"{BOLD}Type the product{RESET} (or 'exit' to exit the app){BOLD}:{RESET}  ")
    if product.lower() == 'exit':
        break
    try:
        qtt = int(input(f"Type the {product} quantity:  "))
        price = float(input(f"How much for the unit?  "))
        stock[product] = {
            "Amount": qtt,
            "Price": float(price * qtt)
        }
    except ValueError:
        print(f"{RED}Error{RESET}: please type a number for the quantity.")

# Dictionary data splitting for it to work with tabulate.
for prod, info in stock.items():
    row = [prod, info["Amount"], info["Price"]]
    table_data.append(row)

print(tb(table_data, headers=["Prod.", "Amount", "Price"]))
input("Press enter to exit...")
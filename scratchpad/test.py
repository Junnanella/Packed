def maximize_profit(price_list):
    if len(price_list) < 2:
        raise ValueError('Getting a profit requires at least 2 prices')
    
    min_price = price_list[0]
    max_profit = price_list[1] - price_list[0]
    
    for day in range(1, len(price_list)):
        stock_price_current = price_list[day]
        tentative_profit = stock_price_current - min_price
        max_profit = max(max_profit, tentative_profit)
        min_price = min(min_price, stock_price_current)
    
    return max_profit

# inputs
price1 = [1, 5, 3, 2]
price2 = [7, 2, 8, 9]
price3 = [1, 6, 7, 9]
price4 = [9, 7, 4, 1]
price5 = [10, 5, 1, 0]
price6 = [100, 180, 260, 310, 40, 535, 695]

print(" List"," --> Profit(₹)")

print("1.", price1, "--> ₹", maximize_profit(price1))
print("2.",price2,"--> ₹",maximize_profit(price2))
print("3.",price3,"--> ₹",maximize_profit(price3))
print("4.",price4,"--> ₹",maximize_profit(price4))
print("5.",price5,"--> ₹",maximize_profit(price5))
print("6.",price6,"--> ₹",maximize_profit(price6))
#class Player:
#  def __init__(self, name, age):
#    self.name = name
#    self.age = age


file = open("inputs/00-example", "r")
data = file.read().split('\n')
print (data)

#print (data[0])

player_stats = data[0].split(' ')

#print (player_stats)

Stamina_current = player_stats[0]
Stamina_max     = player_stats[1]
Turns_max       = player_stats[2]
enemy_amount    = player_stats[3]

print ('Stamina_current: ' + Stamina_current)
print ('Stamina_max: ' + Stamina_max)
print ('Turns_max: ' + Turns_max)
print ('enemy_amount: ' + enemy_amount)

print (len(data))
count = 0
for len in data:
    count += 1
print (count)

#amount_demons = len(data)
amount_demons = count

class deamon:
  def __init__(self, Stamina_cost, Turn_recover,Stamina_gain,amount_of_turns_gain_fragments,fragments_per_turn):
    self.Stamina_cost = Stamina_cost
    self.Stamina_gain = Stamina_gain
    self.amount_of_turns_gain_fragments = amount_of_turns_gain_fragments
    self.amount_of_turns_gain_fragments = amount_of_turns_gain_fragments
    self.fragments_per_turn = fragments_per_turn

List_of_Enemies = []

for i in range(1,amount_demons):
    #print (data[i])
    #print (i)
    deamon_stats = data[i].split(' ')
    Stamina_cost = deamon_stats[0]
    Turn_recover = deamon_stats[1]
    Stamina_gain = deamon_stats[2]
    amount_of_turns_gain_fragments = deamon_stats[3]
    #fragments_list_length = len(deamon_stats)
    #print (fragments_list_length)
    #List_of_Enemies.append(deamon(Stamina_cost, Turn_recover,Stamina_gain,amount_of_turns_gain_fragments))

print(type(List_of_Enemies))
print(type(len(List_of_Enemies)))
x = len(List_of_Enemies)
print(str(x))

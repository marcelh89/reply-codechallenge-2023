def test():
    return "test"


def readInput():
    pass

class Game:

    def __init__(self, )
        self

class Player:
    
    def __init__(self, stamina, maxStamina, turns, demons):
      # amount of stamina the player starts with
      self.stamina = stamina
      # the maximum amount of stamina you can cumulate during the fight
      self.maxStamina = maxStamina
      # number of turns available
      self.turns = turns
      # the number of demons available
      self.demons = demons

      #self.fragments = 


class Demon: 
    #Each demon is defined by
    def __init__(self, stamina, number, amount, turns, fragments):
        #stamina lost by Pandora after defeating the demon
        self.stamina = stamina
        #number of turns needed to recover stamina after the fight
        self.number = number
        #amount of stamina recovered Tr turns after the fight
        self.amount = amount
        #number of turns in which you’ll earn fragments for defeating the demon
        self.turns = turns

        self.fragments = fragments



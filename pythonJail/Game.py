rewards = [[]]
staminaRegain = [[]]

totalAwards = 0

deamonKillOrder = []

for turn in range(1,2):
    for staminaRegain in staminaRegains:
        staminaRegain.turnTillRegain =- 1
        if(staminaRegain.turnTillRegain == 0):
            player.stamina += staminaRegain.staminaToRegain
    
    for reward in rewards:
        totalAwards += reward.pop()
    
    next = determineNextDemon()

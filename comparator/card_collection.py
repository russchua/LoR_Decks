import pandas as pd
import numpy as np
import json
import os
dir_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__))) # This gets the lor_deckbuilder folder
import sys
sys.path.insert(1, dir_path)
from twisted_fate import Deck
print(f'Before anything begins, dir_path: {dir_path}')

class player_full_collection():
    def __init__(self,excel_file = 'russ_card_collection.xlsx'):
        print(f'This is excel_file: {excel_file}')
        print(f'This is the dir_path within player_full_collection: {dir_path}')
        excel_file = os.path.join(dir_path,excel_file)
        
        xls = pd.ExcelFile(excel_file)
        Demacia_Collection = pd.read_excel(xls, 'Demacia', header = None, usecols=[1, 3])
        Freljord_Collection = pd.read_excel(xls, 'Freljord', header = None, usecols=[1, 3])
        Ionia_Collection = pd.read_excel(xls, 'Ionia', header = None, usecols=[1, 3])
        Noxus_Collection = pd.read_excel(xls, 'Noxus', header = None, usecols=[1, 3])
        PnZ_Collection = pd.read_excel(xls, 'PnZ', header = None, usecols=[1, 3])
        SI_Collection = pd.read_excel(xls, 'SI', header = None, usecols=[1, 3])

        full_collection = [Demacia_Collection,Freljord_Collection,Ionia_Collection,Noxus_Collection,PnZ_Collection,SI_Collection]
        all_data = []
        collection_dict = {}
        for collection in full_collection:
            collection_data = collection.to_dict(orient='split')['data']
            all_data = all_data + collection_data

        numpy_list = np.array(all_data)

        with open(os.path.join(dir_path,'twisted_fate/data/data/set1-en_us.json')) as f:            
            json_data = json.load(f)
        all_available_cards = {}
        for each_dictionary in json_data:      
            if each_dictionary['collectible'] == True:
                all_available_cards[each_dictionary['name'].upper()] = [0,each_dictionary['rarity']]                                  
        for i in range(len(numpy_list[:,0])):      
            if (numpy_list[i,1].isdigit()):                    
                try:
                    all_available_cards[numpy_list[i,0].upper()][0] = int(numpy_list[i,1])
                except KeyError:
                    print(f'There is an error: {numpy_list[i,0].upper()}')
        self.all_cards = all_available_cards


    def deck_comparator(self,sample_code = 'CEBAGAIDCQRSOCQBAQAQYDISDQTCOKBNGQAACAIBAMFQ'):        
        custom_dict = self.decode_code_to_dict(sample_code = sample_code)        
        value_dict = {'Champion' : 3000, 'Epic' : 1200, 'Rare' : 300, 'Common' : 100}
        missing_cards = {}
        expected_cost = 0
        for key,value in custom_dict.items():
            missing_quantity = custom_dict[key] - self.all_cards[key][0]
            if missing_quantity != 0:
                missing_cards[key] = custom_dict[key] - self.all_cards[key][0]    
                expected_cost += missing_cards[key] * value_dict[self.all_cards[key][1]]


        return missing_cards,expected_cost


        print(deck_comparator(russ_collection.all_cards,draven_dict))

    def decode_code_to_dict(self,sample_code = 'CEBAGAIDCQRSOCQBAQAQYDISDQTCOKBNGQAACAIBAMFQ'):  
        from twisted_fate import Deck      
        deck_dict = {}
        chosen_deck = Deck.decode(sample_code)
        for j in range(len(chosen_deck.cards)):  
            deck_dict[chosen_deck.cards[j].name.upper()] = chosen_deck.cards[j].count
        return(deck_dict)
        


if __name__ == "__main__":
    russ_collection = player_full_collection(os.path.join(dir_path,'russ_card_collection.xlsx'))
    print(f'This is your collection: {russ_collection.all_cards}')
    desired_deck = russ_collection.decode_code_to_dict()
    print(f'This is the deck you are trying to build: {desired_deck}')
    print(f'These are the cards you need: {russ_collection.deck_comparator(desired_deck)}')

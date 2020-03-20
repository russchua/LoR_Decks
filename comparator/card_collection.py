import pandas as pd
import numpy as np
import json
import os
dir_path = os.path.dirname(os.path.dirname(os.path.realpath(__file__))) # This gets the LoR_Decks folder
import sys
sys.path.insert(1, dir_path)
from encoder_decoder import LoRDeck, CardCodeAndCount

class player_full_collection():
    def __init__(self,excel_file = 'russ_card_collection.xlsx'):
        print(f'I read your collection from the excel_file: {excel_file}\n\n')        
        excel_file = os.path.join(dir_path,'collection/{excel_file}'.format(excel_file = excel_file))
        
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

        with open(os.path.join(dir_path,'data/set1-en_us.json')) as f:            
            json_data = json.load(f)

        code_based_dict = {}
        name_based_dict = {}        
        for each_dictionary in json_data:      
            if each_dictionary['collectible'] == True:
                name_based_dict[each_dictionary['name'].upper()] = {'count': 0, 
                                                                    'rarity' : each_dictionary['rarity'], 
                                                                    'code': each_dictionary['cardCode'], 
                                                                    'name': each_dictionary['name'].upper()}
                code_based_dict[each_dictionary['cardCode']] = name_based_dict[each_dictionary['name'].upper()]      

        for i in range(len(numpy_list[:,0])):      
            if (numpy_list[i,1].isdigit()):                    
                try:
                    name_based_dict[numpy_list[i,0].upper()]['count'] = int(numpy_list[i,1])
                except KeyError:
                    print(f'There is an error: {numpy_list[i,0].upper()}')
        self.name_based_dict = name_based_dict
        self.code_based_dict = code_based_dict


    def deck_comparator(self,sample_code = 'CEBAGAIDCQRSOCQBAQAQYDISDQTCOKBNGQAACAIBAMFQ'):        
        custom_dict = self.decode_code_to_dict(sample_code = sample_code)  
        print(custom_dict)      
        value_dict = {'Champion' : 3000, 'Epic' : 1200, 'Rare' : 300, 'Common' : 100}
        missing_cards = {}
        expected_cost = 0
        for code,quantity in custom_dict.items():
            missing_quantity = custom_dict[code] - self.code_based_dict[code]['count']            
            if missing_quantity >= 0:                                
                missing_cards[code] = {'name': self.code_based_dict[code]['name'],'rarity': self.code_based_dict[code]['rarity'],'missing_quantity' : missing_quantity}
                expected_cost += missing_quantity * value_dict[self.code_based_dict[code]['rarity']]


        return missing_cards,expected_cost


        print(deck_comparator(russ_collection.all_cards,draven_dict))

    def decode_code_to_dict(self,sample_code = 'CEBAGAIDCQRSOCQBAQAQYDISDQTCOKBNGQAACAIBAMFQ'): 
        # Decoding
        deck_dict = {}
        deck = LoRDeck.from_deckcode(sample_code)             
        for index in range(len(list(deck))):            
            card_code = '{set_number:02d}{faction}{card_id:03d}'.format(set_number=deck.cards[index].set,faction = deck.cards[index].faction,card_id=deck.cards[index].card_id)
            deck_dict[card_code] = deck.cards[index].count        
        return(deck_dict)
        


if __name__ == "__main__":    
    russ_collection = player_full_collection('russ_card_collection.xlsx')
    # print(russ_collection.all_cards)
    # print(f'\n\nThis is your collection: {russ_collection.name_based_dict}')
    # print(f'\n\nThis is also your collection: {russ_collection.code_based_dict}')
    desired_deck = russ_collection.decode_code_to_dict()
    # print(f'This is the deck you are trying to build: {desired_deck}')
    sample_code = 'CEBAKAIFAQOSQLRWAUAQEAQDFE2TSAQBAEBDCAYBAUHRIOABAIAQKAYT'
    print(f'These are the cards you need: {russ_collection.deck_comparator(sample_code = sample_code)}')

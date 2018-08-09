import React from 'react';
import {View, SectionList, FlatList, Text, TouchableOpacity, Image} from 'react-native'
import PropTypes from 'prop-types';

import emoji from './data';
import {emojis} from './emojis'

const EmojiItem = ({size, item, onPress}) => {
  return(
    <TouchableOpacity style={{flex: 0, height: size, width: size}} onPress={onPress}>
      <View style={{flex: 0, height: size, width: size}}>
        <Image
          resizeMethod='resize'
          style={{width: size, height: size}}
          //source={emojis[item.image]}
          source={{uri: `https://cdnjs.cloudflare.com/ajax/libs/twemoji/11.0.1/2/72x72/${item.image}`}}
          defaultSource={{uri: require('./loading.png'), width:size, height: size}}
        />
      </View>
    </TouchableOpacity>
  )
}

const EmojiCategory = ({title, data, emojiSize, onPick}) =>{
  return(
    <View key={title}>
      <View style={{width: '100%'}}>
        <Text key={title}>{title}</Text>
      </View>
      <FlatList
        contentContainerStyle={{flexDirection: 'column'}}
        numColumns={8}
        data={data}
        renderItem={({item, index})=>{
          return(<EmojiItem key={index} size={emojiSize} item={item} />)
        }}
      />
    </View>
  )
}

const EmojiPicker = ({headerStyle, containerHeight, containerBackgroundColor, emojiSize, onPick, emojiCategories, showHeader}) => {

  return(
    <FlatList horizontal
      data={emoji}
      renderItem={({item, index})=>(
        <EmojiCategory
          key={item.title}
          title={item.title}
          data={item.data}
          emojiSize={emojiSize}
          onPick={onPick}
        />
      )}
    />
)};

EmojiPicker.propTypes = {
  onPick: PropTypes.func,
  headerStyle: PropTypes.object,
  containerHeight: PropTypes.number.isRequired,
  containerBackgroundColor: PropTypes.string.isRequired,
  emojiSize: PropTypes.number.isRequired,
  emojiCategories: PropTypes.array,
  showHeader: PropTypes.bool
};

EmojiPicker.defaultProps = {
  containerHeight: 240,
  containerBackgroundColor: 'rgba(0, 0, 0, 0.1)',
  emojiSize: 40,
  emojiCategories: ['People', 'Nature', 'Foods', 'Activity', 'Places', 'Objects', 'Symbols', 'Flags'],
  showHeader: true
};

const styles = {
  picker: {
    flex: 0,
    width: '100%',
  },
  category: {
    flex: 0,
    paddingHorizontal: 14,
    paddingTop: 2,
    marginLeft: 2,
    paddingLeft: 0
  },
  categoryName: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 12,
    color: "#888",
  },
  categoryItems: {
    flex: 1,
  }
};

export default EmojiPicker;

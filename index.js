import React from 'react'
import {View, FlatList, Text, TouchableOpacity, Image, Dimensions} from 'react-native'
import PropTypes from 'prop-types'

import emoji from './data'
import {emojis} from './emojis'

const width = Dimensions.get('window').width
const marginSize = 4

const EmojiItem = ({item, size, onPress, local, emojiContainerStyle}) => {
  let source = {uri: `https://cdnjs.cloudflare.com/ajax/libs/twemoji/11.0.1/2/72x72/${item.image}`}
  if(local){
    source = emojis[item.image]
  }

  return(
    <TouchableOpacity onPress={()=>{onPress(item)}}>
      <View style={[{margin: marginSize}, emojiContainerStyle]}>
        <Image
          resizeMethod='resize'
          style={{width: size, height: size}}
          source={source}
        />
      </View>
    </TouchableOpacity>
  )
}

const EmojiCategory = ({title, data, emojiPerLine, emojiSize, onPick, titleStyle, local, categoryContainerStyle, titleContaierStyle, emojiContainerStyle}) =>{

  return(
    <View style={categoryContainerStyle}>
      <View style={titleContaierStyle}>
        <Text style={titleStyle} key={title}>{title}</Text>
      </View>
      <FlatList
        initialNumToRender={3}
        maxToRenderPerBatch={25}
        contentContainerStyle={{flexDirection: 'column'}}
        numColumns={emojiPerLine}
        data={data}
        keyExtractor={(item, index)=> item.image}
        getItemLayout={(data, index)=>({ length: emojiSize, offset: emojiSize * index, index })}
        renderItem={({item, index})=>{
          return(
            <EmojiItem
              item={item}
              local={local}
              size={emojiSize}
              emojiContainerStyle={emojiContainerStyle}
              onPress={onPick}
            />)
        }}
      />
    </View>
  )
}

const EmojiPicker = ({emojiPerLine, onPick, titleStyle, local, categoryContainerStyle, titleContaierStyle, emojiContainerStyle}) => {

  console.log('render EmojiPicker');
  const emojiSize = (width / emojiPerLine) * 0.7
  return(
    <FlatList
      initialNumToRender={1}
      maxToRenderPerBatch={2}
      windowSize={3}
      data={emoji}
      keyExtractor={(item, index)=>item.title}
      contentContainerStyle={{height: '100%', width: '100%'}}
      renderItem={({item, index})=>(
        <EmojiCategory
          title={item.title}
          titleStyle={titleStyle}
          titleContaierStyle={titleContaierStyle}
          data={item.data}
          emojiPerLine={emojiPerLine}
          emojiSize={emojiSize}
          categoryContainerStyle={categoryContainerStyle}
          emojiContainerStyle={emojiContainerStyle}
          onPick={onPick}
          local={local}
        />
      )}
    />
)};

EmojiPicker.propTypes = {
  onPick: PropTypes.func,
  local: PropTypes.bool
}

EmojiPicker.defaultProps = {
  local: true
}

export default EmojiPicker

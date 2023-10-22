import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState }  from 'react';
import ShopHeader from "../components/ShopHeader"
import { colors, fonts } from '../global/styles';

import { getShopData, menu } from '../../assets/Data/data';
import { Icon } from 'react-native-elements';
import {TabView, TabBar} from "react-native-tab-view";
import MenuScreen from './ShopTabs/MenuScreen';






const SCREEN_WIDTH = Dimensions.get('window').width;
const initialLayout = SCREEN_WIDTH;

const ShopHomeScreen = ({navigation, route}) => {

  const {id, shop} = route.params;
  const data = getShopData();

  const [routes] = useState([
    {key: 'first',title: 'OFFERS'},
    {key: 'second',title: 'INFO'},
    {key: 'third',title: 'REVIEWS'},
    {key: 'fourth',title: 'GALLERY'},
  ])

  

  const [modalVisible, setModalVisible] = useState(false)
  const [index, setIndex] = useState(0)
 


  // for shopHomeScreen 
  const renderTabBar = (props) => {
    return (
        <TabBar
            {...props}
            indicatorStyle={{backgroundColor: colors.CardBackground}}
            tabStyle={styles.tabStyle}
            scrollEnabled={true}
            style={styles.tab}
            labelStyle={styles.tabLabel}
            contentContainerStyle={styles.tabContainer}

        />
        
    )
  }



  const updateRoute1 = () => {
    return (
      <View></View>
    )
  }

  const menuPress = () => {
    navigation.navigate("ShopItemDetailScreen")
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <View> 
          <ShopHeader id={id} navigation={navigation}/>

          {
            data[id].discount &&
          <View style={styles.view1}>
            <Text style={styles.text1}>
              GET {data[id].discount}% OFF ON FOOD TOTAL 
            </Text>
          </View>
          }

          {/* Shop Name and info */}

          <View style={styles.view2}>
            <View style={styles.view3}>
              <Text style={styles.text2}>{data[id].ShopName}</Text>
              <Text style={styles.text3}>{data[id].foodType}</Text>

              <View style={styles.view4}>
                <Icon
                  name="star"
                  type="material-community"
                  color={colors.gray4}
                  size={15}
                />
                <Text style={styles.text4}>{data[id].rating}</Text>
                <Text style={styles.text5}>({data[id].numReviews})</Text>

                <Icon
                  name="map-marker"
                  type="material-community"
                  color={colors.gray4}
                  size={15}
                />        
                <Text style={styles.text6}>{data[id].farAway} km away</Text>
              </View>
            </View>

          {/* collect or delivery section */}

          <View style={styles.view5}>
            <Text style={styles.text6}>Collect</Text>
            <View style={styles.view7}>
              <Text style={styles.text7}>{data[id].collectTimes}</Text>
              <Text style={styles.text8}>min</Text>
            </View>

            <View style={styles.view8}>
              <Text style={styles.text6}>Delivery</Text>

              <View style={styles.view9}>
                <Text style={styles.text9}>{data[id].deliveryTimes}</Text>
                <Text style={styles.text11}>min</Text>
              </View>
            </View>
          </View>
          </View>
   
        </View>

        {/* Tab nav */}
        <View style={styles.view10}>
          <TabView
            navigationState={{index, routes}}
            renderScene={updateRoute1}
            onIndexChange = {setIndex}
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
            tabBarPosition='top'
          />
        </View>

        {
          index === 0 && 
          <MenuScreen onPress={menuPress}/>
        }

      </ScrollView>

          {/* View Cart  */}

      <TouchableOpacity>
        <View style={styles.view11}>
          <View style={styles.view12}>
            <Text style={styles.text13}>Items In Basket</Text>

            <View style={styles.view13}>
              <Text style={styles.text13}>
                0
              </Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>


    </View>
  )
}

export default ShopHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    width: '100%',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold'
  },
  text2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.black  
  },
  text3: {
    fontSize: 15,
    fontWeight: 'bold', 
    color: colors.gray4
  },
  view2: {
    flexDirection: 'row',
    flex:1,
    marginBottom: 5,
    marginHorizontal:10,
    justifyContent: 'space-between',
    alignItems: 'center',
   
  },
  view3: {
    flex:8,
    fontSize: 15,
    color: colors.gray4,
     marginTop: -40
  },
  view4: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  text4: {
    fontFamily: fonts.android.bold,
    fontSize: 13,
    color: colors.gray4,
    marginLeft:2,
  },
  text5: {
    fontFamily: fonts.android.bold,
    fontSize: 13,
    color: colors.gray4,
    marginLeft: 2,
    marginRight: 5
  },
  text12: {
    fontFamily: fonts.android.bold,
    fontSize: 13,
    color: colors.gray4,
    marginLeft: 0
  },
  view5: {
    flex:3,
    alignItems: 'center',    
  },
  text6: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.black
  },
  view7: {
    width: 40,
    height: 40,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-around'
  },
  text7: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray4,
    marginTop: 5
  },
  text8: {
    fontSize: 13,
    color: colors.gray4,
    marginBottom: 5
  },
  view8: {
    flex: 3,
    alignItems: 'center',
  },
  text9: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.CardBackground
  },
  view9: {
    width: 40,
    height: 40,
    backgroundColor: colors.buttons,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-around'
  },
  text10: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.CardBackground,
    marginTop: 5
  },
  text11: {
    fontSize:13,
    color: colors.CardBackground,
    marginBottom: 5
  },
  view10: {
    elevation: 10,
    backgroundColor: colors.pageBackground, //color not available
  },
 view11: {
  backgroundColor: colors.buttons,
  height: 50,
  justifyContent: 'center'
 },
 view12: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
 },
 text12: {
  padding:10,
  fontWeight: 'bold',
  fontSize: 18,
  color: colors.CardBackground
 },
 view13: {
  borderWidth: 1,
  marginRight: 10,
  borderColor: colors.CardBackground,
  borderRadius: 6,
  paddingBottom: 2
 },
 text13: {
  paddingHorizontal: 3,
  fontWeight: 'bold',
  fontSize: 18,
  color: colors.CardBackground
 },
 tab: {
  paddingTop:0,
  backgroundColor: colors.buttons,
  justifyContent: 'space-between',
  alignItems: 'center'
 },
 tabContainer: {
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center'
 },
 tabLabel: {
  fontWeight: 'bold',
  color: colors.CardBackground,
 },
 tabStyle: {
  width: SCREEN_WIDTH/4,
  maxHeight: 45
 },
 view14: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  backgroundColor: colors.buttons,
  top:0,
  left:0,
  right:0,
  paddingTop: 25
 },
 text14: {
  fontWeight: 'bold',
  marginLeft: 40,
  color: colors.black,
  fontSize: 18
 },
 view15: {
  marginTop: 5,
  paddingBottom: 20
 }

})
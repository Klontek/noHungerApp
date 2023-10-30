import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Badge, ListItem, Text } from 'react-native-elements';
// import {ListItem, Badge, Text} from "na";



export default function CategoryFilter({           
categories,
filterCategory,
productCategories,
active,
setActive, 
}) {
  return (
   <ScrollView
     bounces={true}
     horizontal={true}
     style={{backgroundColor: "#f2f2f2"}}
   >
    <ListItem style={{margin: 0, padding: 0, borderRadius: 0}}>
     <TouchableOpacity 
     key={1}
     onPress={() => {
      filterCategory('all'),
      setActive(-1)
     }}
     >
      <Badge
        style={[styles.center, {margin: 5},
           active == -1 ? styles.active : styles.inActive
        ]}
      >
        <Text style={{color: 'white'}}>All</Text>
      </Badge>

     </TouchableOpacity>
     {categories.map((item)=> (
          <TouchableOpacity 
          key={item.id}
          onPress={() => {
           filterCategory(item.id),
           setActive(categories.indexOf(item))
          }}
          >
           <Badge
             style={[styles.center, {margin: 5},
                active == categories.indexOf(item) ? styles.active : styles.inActive
             ]}
           >
            <Text style={{color: 'white'}}>{item.name}</Text>
           </Badge>

           
          </TouchableOpacity>
     ))}
    </ListItem>

   </ScrollView>
  )
}

const styles = StyleSheet.create({
 center: {
  justifyContent: 'center',
  alignItems: 'center',
  height: 30
 },
 active: {
  backgroundColor: '#03bafc'
 }, 
 inActive: {
  backgroundColor: '#a0e1eb'
 }
})
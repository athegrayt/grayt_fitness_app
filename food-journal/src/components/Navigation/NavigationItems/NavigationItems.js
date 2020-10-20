import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
    
    
const navigationItems = (props) =>{
   return(
       <ul className={classes.NavigationItems}>
           <NavigationItem link="/" active>Food Journal</NavigationItem>
           <NavigationItem link="/">Nutritional Data</NavigationItem>
       </ul>
   );
    
};
export default navigationItems;
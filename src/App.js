import React, { Component } from 'react';
import foods from './foods.json';
import FoodBox from './components/FoodBox';
import FoodList from './components/FoodList';
import Search from './components/Search';
import AddFoodForm from './components/AddFoodForm';
import 'bulma/css/bulma.css';
import './App.css';

class App extends Component {
  state = {
    foods,
    filteredFoodList: foods,
    foodList: []
  }

  searchFilter = (event) => {
    const filteredFoods = this.state.foods.filter(food => food.name.toLowerCase().includes(event.toLowerCase()));
    this.setState(() => ({
      filteredFoodList: filteredFoods
    }))
  }
  
  addFoodToList = (food) => {
    let isInFoodList = false;
    let newFoodList = [];
    
    // check if the added food item is already in the list
    this.state.foodList.forEach(item => {
      if (item.name === food.name) isInFoodList = true;
    })

    // if the new food item is in the list, update the quantity
    // else add the new food item to the list
    if (isInFoodList) {
      newFoodList = [...this.state.foodList].map((item) => {
        if (item.name === food.name) {
          (item.quantity + food.quantity >= 0) 
          ? item.quantity += food.quantity
          : item.quantity = 0;
        }
        return item;
      });  
      newFoodList.filter(item => item.quantity >= 0);
    } else {
      newFoodList = [...this.state.foodList, food];
    }

    // update the state with the new list
    this.setState(() => ({
      foodList: newFoodList
    }));
  }

  addFoodBox = async (food) => {
    await this.setState(state => ({
      foods: [...state.foods, food],
      filteredFoodList: [...state.filteredFoodList, food]
    }))
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">IronNutrition</h1>
          <Search onChange={this.searchFilter} />
          <AddFoodForm onSubmit={this.addFoodBox} /><br />
        <div className="columns">
          <div className="column">
              {this.state.filteredFoodList.map(food => 
                <FoodBox onSubmit={this.addFoodToList} key={food.name} item={food}/>
              )}
          </div>
          <div className="column content">
            <FoodList list={this.state.foodList}/> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;

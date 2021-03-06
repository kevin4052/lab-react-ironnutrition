import React from 'react'

const FoodList = (props) => {
    let {list} = props;    
    const calorieSum = props.list.map(ele => ele.quantity * ele.calories).reduce((a, b) => a + b, 0);

    list = list.filter(food => food.quantity >= 1);

    return (
        <div>
            <h2 className="subtitle">Today's foods</h2>
            <ul>
                {list.map((food, index) =>
                    <li key={index}>{food.quantity} {food.name} = {food.quantity * food.calories} cal</li>
                )}
            </ul>
            <strong>Total: {calorieSum >= 0 ? calorieSum : 0} cal</strong>
        </div>
    );
};

export default FoodList;


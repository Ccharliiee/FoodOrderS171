import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

import useHttp from "../hooks/useHttp";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const DUMMY_MEALS = [
  {
    id: "ts1",
    name: "Tuna Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "bs2",
    name: "Breaded Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "bbb3",
    name: "BBQ Beef Burger",
    description: "American, raw, meaty",
    price: 15.99,
  },
  {
    id: "gmb4",
    name: "Green Mix Bowl",
    description: "Mix of green",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const [mealsState, setMealsState] = useState(DUMMY_MEALS);
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    fetchMeals({
      url: "https://us-west-100-cd40-default-rtdb.firebaseio.com/tasks/foodorderapp/meals.json",
      path: "/tasks/foodorderapp",
      rpLoader: (mealsdata) => {
        const rpMeals = [];

        for (const mealKey in mealsdata) {
          rpMeals.push({
            id: mealKey,
            name: mealsdata[mealKey].name,
            description: mealsdata[mealKey].description,
            price: mealsdata[mealKey].price,
          });
        }

        setMealsState(rpMeals);
        console.log("mealsdata[rpMeals]:   ", rpMeals);
      },
    });
  }, [fetchMeals]);

  const mealsList = (mealsState ?? DUMMY_MEALS).map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      {error && (
        <Alert key="fetchMealsError" variant="warning">
          This is a alert—check it out! {error}
        </Alert>
      )}
      <Card>
        <ul>{!isLoading && !error && mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

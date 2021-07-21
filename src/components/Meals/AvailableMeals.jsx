import React, { useEffect, useState } from "react";
import MealsItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvaiableMeals.module.css";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://react-http-e353e-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const responseData = await response.json();
        const loadedMeals = [];
        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }
        setMeals(loadedMeals);
      } catch (error) {
        setError(error.message);
      }
      setIsValid(false);
    };
    fetchMeals();
  }, []);
  if (isValid) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (!isValid && error) {
    return (
      <section className={classes.MealsLoading}>
        <p>{error}</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => (
    <MealsItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>{!isValid && meals.length > 0 && <ul>{mealList}</ul>}</Card>
    </section>
  );
}
export default AvailableMeals;

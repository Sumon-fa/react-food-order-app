import React from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
function MealsItemForm(props){
    return <form className={classes.form}>
        <Input input={{
            id:"amount"+props.id,
            label:"Amount",
            type:"number",
            min:"1",
            max:"5",
            step:"1",
            defaultValue:"1"
        }}/>
        <button>+ Add</button>
    </form>
}
export default MealsItemForm;
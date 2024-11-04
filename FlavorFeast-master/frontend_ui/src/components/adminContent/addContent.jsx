import React, { useState } from "react";
import axios from "axios";
import "./addContent.css";

function AddContent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [steps, setSteps] = useState([""]);
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [servings, setServings] = useState("");
  const [tags, setTags] = useState([""]);
  const [nutrition, setNutrition] = useState({
    calories: "",
    carbohydrates: "",
    proteins: "",
    fats: "",
    fiber: "",
    sugar: "",
    sodium: "",
  });

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleTagChange = (index, value) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const handleNutritionChange = (field, value) => {
    const newNutrition = { ...nutrition };
    newNutrition[field] = value;
    setNutrition(newNutrition);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = {
      title,
      description,
      ingredients,
      steps,
      prepTime,
      cookTime,
      totalTime,
      servings,
      tags,
      nutrition,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/admin/product/add-product",
        productData
      );
      if (response.data.success) {
        alert("Product added successfully!");
      } else {
        alert("Failed to add product: " + response.data.message);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="add-content-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-group">
              <input
                type="text"
                placeholder="Name"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={() =>
                  setIngredients([
                    ...ingredients,
                    { name: "", quantity: "", unit: "" },
                  ])
                }
              >
                Add Ingredient
              </button>
            </div>
          ))}
        </div>
        <div className="form-group">
          <label>Steps:</label>
          {steps.map((step, index) => (
            <div key={index} className="step-group">
              <input
                type="text"
                placeholder="Step"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => setSteps([...steps, ""])}>
                Add Step
              </button>
            </div>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="prepTime">Prep Time:</label>
          <input
            type="number"
            id="prepTime"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cookTime">Cook Time:</label>
          <input
            type="number"
            id="cookTime"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalTime">Total Time:</label>
          <input
            type="number"
            id="totalTime"
            value={totalTime}
            onChange={(e) => setTotalTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="servings">Servings:</label>
          <input
            type="number"
            id="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Tags:</label>
          {tags.map((tag, index) => (
            <div key={index} className="tag-group">
              <input
                type="text"
                placeholder="Tag"
                value={tag}
                onChange={(e) => handleTagChange(index, e.target.value)}
              />
              <button type="button" onClick={() => setTags([...tags, ""])}>
                Add Tag
              </button>
            </div>
          ))}
        </div>
        <div className="form-group">
          <label>Nutrition:</label>
          <input
            type="number"
            placeholder="Calories"
            value={nutrition.calories}
            onChange={(e) => handleNutritionChange("calories", e.target.value)}
          />
          <input
            type="number"
            placeholder="Carbohydrates"
            value={nutrition.carbohydrates}
            onChange={(e) =>
              handleNutritionChange("carbohydrates", e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Proteins"
            value={nutrition.proteins}
            onChange={(e) => handleNutritionChange("proteins", e.target.value)}
          />
          <input
            type="number"
            placeholder="Fats"
            value={nutrition.fats}
            onChange={(e) => handleNutritionChange("fats", e.target.value)}
          />
          <input
            type="number"
            placeholder="Fiber"
            value={nutrition.fiber}
            onChange={(e) => handleNutritionChange("fiber", e.target.value)}
          />
          <input
            type="number"
            placeholder="Sugar"
            value={nutrition.sugar}
            onChange={(e) => handleNutritionChange("sugar", e.target.value)}
          />
          <input
            type="number"
            placeholder="Sodium"
            value={nutrition.sodium}
            onChange={(e) => handleNutritionChange("sodium", e.target.value)}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddContent;

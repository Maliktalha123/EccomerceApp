import { message } from "antd";
import React, { createContext, useEffect, useState } from "react";

export const FavoriteContext = createContext();

function FavoriteContextProvider({ children }) {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const itemsFromStorage = localStorage.getItem("favoriteItems");
    if (itemsFromStorage) {
      setFavoriteItems(JSON.parse(itemsFromStorage));
    }
    setIsLoaded(true); // <- set true regardless
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
    }
  }, [favoriteItems]);

  function addItemToFavorite(item) {
    const arr = favoriteItems;
    const itemIndex = favoriteItems.findIndex((data) => data.id == item.id);

    if (itemIndex == -1) {
      arr.push(item);
      message.success("Item is added to favorites");
    } else {
      message.success("Item is already in your favorite list");
    }
    setFavoriteItems([...arr]);
  }

  function removeItemFromFavorite(id) {
    const arr = favoriteItems;
    const itemIndex = favoriteItems.findIndex((data) => data.id == id);
    arr.splice(itemIndex, 1);
    setFavoriteItems([...arr]);
    message.success("Item is removed from favorites");
  }

  function isItemAddedInFavorites(id) {
    const arr = favoriteItems;
    const itemIndex = favoriteItems.findIndex((data) => data.id == id);
    if (itemIndex == -1) {
      return null;
    } else {
      return arr[itemIndex];
    }
  }

  return (
    <FavoriteContext.Provider
      value={{
        favoriteItems,
        addItemToFavorite,
        isItemAddedInFavorites,
        removeItemFromFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContextProvider;

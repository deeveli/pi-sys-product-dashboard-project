import { useState, useEffect } from 'react';

export const useFavoriteProducts = () => {
  const [favoriteProductIds, setFavoriteProductIds] = useState<number[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favoriteProductIds');
      if (storedFavorites) {
        setFavoriteProductIds(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever favoriteProductIds changes
  useEffect(() => {
    try {
      localStorage.setItem(
        'favoriteProductIds',
        JSON.stringify(favoriteProductIds),
      );
    } catch (error) {
      console.error('Failed to save favorites to localStorage:', error);
    }
  }, [favoriteProductIds]);

  const handleFavoriteClick = (productId: number) => {
    setFavoriteProductIds((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter((id) => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  return { favoriteProductIds, handleFavoriteClick };
};

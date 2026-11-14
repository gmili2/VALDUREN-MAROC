-- Parfums : les champs « matière / coupe / entretien » portent les notes de tête, de cœur et de fond (plus longues).
ALTER TABLE `products` MODIFY `caseMaterial` VARCHAR(150) NOT NULL,
  MODIFY `strapMaterial` VARCHAR(150) NOT NULL,
  MODIFY `glass` VARCHAR(150) NOT NULL;

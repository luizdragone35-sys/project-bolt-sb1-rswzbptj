/*
  # Add estado column to addresses table

  1. Changes
    - Add `estado` column to `addresses` table
      - `estado` (text) - Estado/UF
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'addresses' AND column_name = 'estado'
  ) THEN
    ALTER TABLE addresses ADD COLUMN estado text DEFAULT '';
  END IF;
END $$;

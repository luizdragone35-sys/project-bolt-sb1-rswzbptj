/*
  # Create addresses table

  1. New Tables
    - `addresses`
      - `id` (uuid, primary key)
      - `cep` (text) - CEP do endereço
      - `rua` (text) - Nome da rua/avenida
      - `numero` (text) - Número do endereço
      - `complemento` (text, optional) - Complemento do endereço
      - `informacoes` (text, optional) - Informações adicionais
      - `sem_numero` (boolean) - Indica se o endereço não tem número
      - `tipo_endereco` (text) - Tipo do endereço (casa ou trabalho)
      - `nome_completo` (text) - Nome completo para contato
      - `telefone` (text) - Telefone de contato
      - `cidade` (text) - Cidade
      - `bairro` (text) - Bairro
      - `created_at` (timestamptz) - Data de criação

  2. Security
    - Enable RLS on `addresses` table
    - Add policy for anyone to insert addresses (for demo purposes)
    - Add policy for anyone to read addresses (for demo purposes)
*/

CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cep text NOT NULL,
  rua text NOT NULL,
  numero text DEFAULT '',
  complemento text DEFAULT '',
  informacoes text DEFAULT '',
  sem_numero boolean DEFAULT false,
  tipo_endereco text NOT NULL DEFAULT 'casa',
  nome_completo text NOT NULL,
  telefone text NOT NULL,
  cidade text DEFAULT 'Jaru',
  bairro text DEFAULT 'Centro',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to insert addresses"
  ON addresses
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anyone to read addresses"
  ON addresses
  FOR SELECT
  TO anon
  USING (true);
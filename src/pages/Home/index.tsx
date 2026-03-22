import styles from "./styles.module.css"
import background from "../../assets/image-background.png"
import { Button } from "../../components/Button"

export function Home() {
  return (
    <div className={styles.container}>
      {/* LADO ESQUERDO */}
      <div
        className={styles.left}
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* LADO DIREITO */}
      <div className={styles.right}>
        <h1 className={styles.title}>Procure o imóvel ideal</h1>

        {/* LOCALIZAÇÃO */}
        <h2 className={styles.subtitle}>Localização</h2>

        <div className={styles.grid}>
          <div>
            <label>Cidade</label>
            <select>
              <option>Cidade</option>
              <option>Limoeiro</option>
              <option>Bom Jardim</option>
              <option>Orobó</option>
              <option>Surubim</option>
              <option>Feira Nova</option>
            </select>
          </div>

          <div>
            <label>Bairro</label>
            <select>
              <option>Bairro</option>
              <option>Mendes</option>
              <option>Santa Terezinha</option>
              <option>Cidade Alta</option>
            </select>
          </div>

          <div>
            <label>Região</label>
            <select>
              <option>Região</option>
              <option>Periférica</option>
              <option>Comercial</option>
              <option>Centro</option>
            </select>
          </div>

          <div>
            <label>Proximidade à praia</label>
            <select>
              <option>Proximidade à praia</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>
        </div>

        {/* CARACTERÍSTICAS */}
        <h2 className={styles.subtitle}>Características do imóvel</h2>

        <div className={styles.grid}>
          <div>
            <label>Metragem</label>
            <select>
              <option>Metragem</option>
              <option>50m²</option>
              <option>80m²</option>
              <option>120m²</option>
              <option>200m²</option>
              <option>300m²+</option>
            </select>
          </div>

          <div>
            <label>Vagas de garagem</label>
            <select>
              <option>Vagas</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
          </div>

          <div>
            <label>Número de suítes</label>
            <select>
              <option>Suítes</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
          </div>

          <div>
            <label>Número de salas</label>
            <select>
              <option>Salas</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
          </div>

          <div>
            <label>Número de quartos</label>
            <select>
              <option>Quartos</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6+</option>
            </select>
          </div>

          <div>
            <label>Número de banheiros</label>
            <select>
              <option>Banheiros</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6+</option>
            </select>
          </div>

          <div>
            <label>Possui piscina</label>
            <select>
              <option>Piscina</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <div>
            <label>Possui área gourmet</label>
            <select>
              <option>Área gourmet</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>
        </div>

        {/* ESTRUTURA */}
        <h2 className={styles.subtitle}>Estrutura</h2>

        <div className={styles.grid}>
          <div>
            <label>Tipo do imóvel</label>
            <select>
              <option>Tipo</option>
              <option>Apartamento</option>
              <option>Casa</option>
              <option>Chácara</option>
            </select>
          </div>

          <div>
            <label>Estado de conservação</label>
            <select>
              <option>Estado</option>
              <option>Novo</option>
              <option>Seminovo</option>
              <option>Muito usado</option>
            </select>
          </div>
        </div>

        {/* NEGOCIAÇÃO */}
        <h2 className={styles.subtitle}>Negociação</h2>

        <div className={styles.grid}>
          <div>
            <label>Finalidade</label>
            <select>
              <option>Finalidade</option>
              <option>Alugar</option>
              <option>Comprar</option>
            </select>
          </div>

          <div>
            <label>Condomínio</label>
            <select>
              <option>Condomínio</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <div>
            <label>Valor</label>
            <select>
              <option>Valor</option>
              <option>Até 100 mil</option>
              <option>100k - 300k</option>
              <option>300k - 600k</option>
              <option>600k+</option>
            </select>
          </div>
        </div>

        <Button text="Procurar imóvel" />
      </div>
    </div>
  )
}
import styles from "../styles/MyPets.module.css";
import styles2 from "../styles/Structure.module.css";


const pets = [
  {
    id: 1,
    name: "Max",
    breed: "Golden Retriever",
    age: 3,
    image: "src/assets/pets/Max.png",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Husky",
    age: 1,
    image: "src/assets/pets/Luna.png",
  },
  {
    id: 3,
    name: "Rocky",
    breed: "Pastor Alemán",
    age: 4,
    image: "src/assets/pets/Rocky.png",
  },
];



const MyPets = () => {
  return (
    <div className={styles2.root}>
      <main className={styles2.main}> 
              <div className={styles.header}>
          <h1>My Pets</h1>

          <button className={styles.addButton}>
            + Agregar
          </button>
        </div>

        <div className={styles.petGrid}>
          {pets.map((pet) => (
            <div key={pet.id} className={styles.petCard}>
              <img
                src={pet.image}
                alt={pet.name}
                className={styles.petImage}
              />

              <div className={styles.petInfo}>
                <h3>{pet.name}</h3>
                <p>{pet.breed}</p>
              </div>

              <button className={styles.viewButton}>
                Ver perfil →
              </button>
            </div>
          ))}
        </div>
        </main>
    </div>
  )
}

export default MyPets

import styles from "../styles/Structure.module.css";
import styles2 from "../styles/AddDevices.module.css";
import { handleAdd } from "../hooks/handleAddDevices";
import { useState } from "react";

export default function AddDevices() {

    const [deviceCode, setDeviceCode] = useState("");
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");

    return (

        <div className={styles.root}>
            <main className={styles.main}>
                <form className={styles2.form} onSubmit={(e) => handleAdd(e, deviceCode, deviceName, deviceType)}>
                    <h2 className={styles2.title}>Registrar Dispositivo</h2>

                    <div className={styles2.formGroup}>
                        <label>ID del dispositivo</label>
                        <input
                            type="text"
                            value={deviceCode}
                            onChange={(e) => setDeviceCode(e.target.value)}
                        />
                    </div>

                    <div className={styles2.formGroup}>
                        <label>Nombre</label>
                        <input
                            type="text"
                            value={deviceName}
                            onChange={(e) => setDeviceName(e.target.value)}
                        />
                    </div>

                    <div className={styles2.formGroup}>
                        <label>Tipo de dispositivo</label>

                        <select
                            value={deviceType}
                            onChange={(e) => setDeviceType(e.target.value)}
                            className={styles2.select}
                        >
                            <option value="">Seleccione un dispositivo</option>
                            <option value="food_dispenser">Dispensador de comida</option>
                            <option value="water_dispenser">Dispensador de agua</option>
                            <option value="smart_door">Puerta inteligente</option>
                            <option value="ball_launcher">Lanzador de pelotas</option>
                            <option value="activity_monitor">Monitor de actividad</option>
                            <option value="temperature_sensor">Sensor de temperatura</option>
                            <option value="pet_communicator">Comunicación con mascota</option>
                            <option value="reward_dispenser">Dispensador de recompensas</option>
                        </select>
                    </div>

                    <button
                        className={styles2.submitButton}
                        type="submit"
                        
                    >
                        Guardar dispositivo
                    </button>
                </form>

            </main>
        
        
        </div>
    );
}
import React, { useEffect, useState } from 'react'
import styles from "../../styles/GameStyle.module.css"

const Themes = ({data}: any) => {
    
    const [isMap, setMap] = useState('#000000')
    const [prevMap, setPrevMap] = useState('#000000')
  

    const ischeckboxMapSelected = (value: string): boolean => isMap === value;

    const handleMap = (e: any) => {
        if (isMap === prevMap)
        {
            setMap(e.target.value)
            setPrevMap(e.target.value)
        }
    }

    useEffect(()=> {
        data.set_mapColor(isMap);
    },[isMap])

  return (
        <div className={styles.themes}>
                <div>
                    <h1 className={styles.Title}>Choose your table theme</h1>
                </div>
            <form className={styles.formThemes}  style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            flexWrap:"wrap",
                            gap:"8px"}}>
                    <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }}>
                        <input
                            id="crimson"
                            type="checkbox"
                            name='table'
                            value='crimson'
                            checked={ischeckboxMapSelected('crimson')}
                            onChange={handleMap}
                            style={{ display:"none"}}
                        />
                        <label htmlFor="crimson"><img style={{width:"180px", height:"100px", border: ischeckboxMapSelected('crimson') ? "5px solid rgba(15,125,169, 0.8)": "none"}} src="crimson.png" alt="blue theme" /></label>
                    </div>
                    <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }}>
                        <input
                            id="blue"
                            type="checkbox"
                            name='table'
                            value='blue'
                            checked={ischeckboxMapSelected('blue')}
                            onChange={handleMap}
                            style={{ display:"none"}}
                        />
                        <label htmlFor="blue"><img style={{width:"180px", height:"100px", border: ischeckboxMapSelected('blue') ? "5px solid rgba(15,125,169, 0.8)": "none"}} src="blue.png" alt="blue theme" /></label>
                    </div>
                    <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                        }}
                    >
                        <input
                            id="purple"
                            type="checkbox"
                            name='table'
                            value='purple'
                            checked={ischeckboxMapSelected('purple')}
                            onChange={handleMap}
                            style={{ display:"none"}}
                        />
                        <label htmlFor="purple"><img style={{width:"180px", height:"100px", border: ischeckboxMapSelected('purple') ? "5px solid rgba(15,125,169, 0.8)": "none"}} src="purple.png" alt="purple theme" /></label>
                    </div>
            </form>
      </div>
  )
}

export default Themes
# react-water-animation-2d

Wrapper of water-animation-2d for React

## Install 

```shell
npm i water-animation-2d
```

## How to use?

For animation you need both "WaterAnimation" and "useWaterAnimationManager"

Example of use:

```jsx
import WaterAnimation, {useWaterAnimationManager} from "react-water-animation-2d";

const Example = () => {
    const {control, waterAnimationManager} = useWaterAnimationManager();
    
    return <div
        style={{
            width: "300px"
        }}
    >
        <WaterAnimation
            control={control}
            fullWidth
        />
        <br />
        <button
            onClick={() => {
                // apply force to the middle of water line downward for 200 ms
                waterAnimationManager.applyForce(
                    150, // position of force (in px)
                    {x: 0, y: 1000}, // force
                    200 // duration of force (in ms)
                )
            }}
        >
            Trigger animation
        </button>
    </div>
}
```

## Author

Vladislav Nikolaev, *react frontend developer*

vladisnotlove@gmail.com<br/>
<a href="https://t.me/vladisnotlove">telegram</a> |
<a href="https://gitlab.com/vladisnotlove">gitlab</a> |
<a href="https://github.com/vladisnotlove">github</a>

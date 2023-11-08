input.setAccelerometerRange(AcceleratorRange.TwoG)
let last_update = input.runningTimeMicros()
let [VX, VY, VZ] = [NaN, NaN, NaN]
let [X, Y, Z] = [NaN, NaN, NaN]
CutebotPro.fullSpeedAhead()
basic.forever(function on_forever() {
    basic.pause(100)
    serial.writeValue("Heading", input.compassHeading())
    serial.writeValue("PITCH", input.rotation(Rotation.Pitch))
    serial.writeValue("ROLL", input.rotation(Rotation.Roll))
    serial.writeValue("X_accel", input.acceleration(Dimension.X))
    serial.writeValue("Y_accel", input.acceleration(Dimension.Y))
    serial.writeValue("Z_accel", input.acceleration(Dimension.Z))
})
basic.forever(function on_forever2() {
    if (!input.logoIsPressed()) {
        return
    }
    
    basic.pause(1000)
    let [VX, VY, VZ] = [0, 0, 0]
    let [X, Y, Z] = [0, 0, 0]
    let last_update = input.runningTimeMicros()
})
loops.everyInterval(1, function onEvery_interval() {
    let last_update: number;
    let now_time = input.runningTimeMicros()
    let delta = now_time - last_update
    last_update = now_time
    
    
    
    
    
    
    let AXYZ = [input.acceleration(Dimension.X), input.acceleration(Dimension.Y), input.acceleration(Dimension.Z)]
    VX = delta * AXYZ[0] + VX
    VY = delta * AXYZ[1] + VY
    VZ = delta * AXYZ[2] + VZ
    X = 1 / 2 * AXYZ[0] * delta * delta + VX * delta + X
    X = 1 / 2 * AXYZ[0] * delta * delta + VX * delta + X
    X = 1 / 2 * AXYZ[2] * delta * delta + VZ * delta + Z
})

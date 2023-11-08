input.set_accelerometer_range(AcceleratorRange.TWO_G)
last_update = input.running_time_micros()
VX, VY, VZ = na_n, na_n, na_n
X, Y, Z = na_n, na_n, na_n
CutebotPro.full_speed_ahead()
def on_forever():
    basic.pause(100)
    serial.write_value("Heading",input.compass_heading())
    serial.write_value("PITCH", input.rotation(Rotation.PITCH))
    serial.write_value("ROLL", input.rotation(Rotation.ROLL))
    serial.write_value("X_accel",input.acceleration(Dimension.X))
    serial.write_value("Y_accel",input.acceleration(Dimension.Y))
    serial.write_value("Z_accel",input.acceleration(Dimension.Z))

basic.forever(on_forever)
def on_forever2():
    if(not input.logo_is_pressed()):
        return
    basic.pause(1000)
    VX,VY,VZ = 0,0,0
    X, Y, Z = 0,0,0
    last_update = input.running_time_micros()
basic.forever(on_forever2)
def onEvery_interval():
    now_time = input.running_time_micros()
    delta = now_time - last_update
    last_update = now_time
    global X
    global Y
    global Z
    global VX
    global VY
    global VZ


    AXYZ = [input.acceleration(Dimension.X),input.acceleration(Dimension.Y),input.acceleration(Dimension.Z)]
    VX = delta * AXYZ[0] + VX 
    VY = delta * AXYZ[1] + VY
    VZ = delta * AXYZ[2] + VZ
    X = 1/2 * AXYZ[0] * delta*delta + VX * delta + X
    X = 1/2 * AXYZ[0] * delta*delta + VX * delta + X
    X = 1/2 * AXYZ[2] * delta*delta + VZ * delta + Z

loops.every_interval(1, onEvery_interval)

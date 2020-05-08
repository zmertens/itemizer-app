
test('# Cat is not a bat', async () => {
    expect("cat").not.toMatch(/^bat/)
})
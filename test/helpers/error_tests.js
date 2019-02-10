module.exports = async (type, fn, message) => {
    let i, y, err;
    try {
        y = await fn();
        i = true;
    } catch(e) {
		err = e
        i = false;
    }

	assert.equal(i, !!type, message + ' ' + (type && !i ? err.message : ' '))
	return y;
}
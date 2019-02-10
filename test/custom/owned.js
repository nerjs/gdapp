const et = require('../helpers/error_tests');
const checkEvents = require('../helpers/check_events')
const addrUtil = require('../helpers/address')



module.exports = (Contract, accounts, _owner) => {
    it('Проверка прав доступа ', async () => {
        let owner, isOwner;

        const acc_0 = _owner || accounts[0],
            acc_1 = accounts[1],
            acc_2 = accounts[2];

        const contract = await Contract.deployed();

        owner = await contract.owner();
        isOwner = await contract.isOwner({ from: acc_0 });

        assert.equal(owner, acc_0, '[Owner] при создании контракта равен создателю сонтракта');
        assert(isOwner, '[Owner] при создании контракта равен создателю сонтракта');
        
        await et(false, () => contract.transferOwner(acc_1, { from: acc_2 }), 'У второго АКК нет прав')
        await et(true, () => contract.transferOwner(acc_1, { from: acc_0 }), 'У первого АКК есть права')

        
        owner = await contract.owner();
        assert.equal(owner, acc_0, '[Owner] по прежнему равен первому АКК')

        await et(false, ()=>contract.confirmOwner({ from: acc_2}), 'Подтверждение от неправильного пользователя');

        const tx = await contract.confirmOwner({ from: acc_1 });

        checkEvents(tx, 'TransferredOwner', 1, {
            previousOwner: acc_0,
            newOwner: acc_1
        });

        owner = await contract.owner();
        isOwner = await contract.isOwner({ from: acc_1 });

        assert.equal(owner, acc_1, '[Owner] равен второму АКК');
        assert(isOwner, '[Owner] равен второму АКК');


        isOwner = await contract.isOwner({ from: acc_0 });
        assert(!isOwner, '[Owner] не равен первому АКК');

        await et(true, ()=>contract.transferOwner(acc_2, { from: acc_1}), 'Передача прав третьему АКК')
        await et(true, ()=>contract.cancelOwner({ from: acc_1}), 'Отмена передачи прав')
        await et(false, ()=>contract.confirmOwner({ from: acc_2}), 'Подтвердить передачу прав невозможно')

        await et(false, ()=>contract.transferOwner(addrUtil.ADDRESS, { from: acc_1}), 'Передача прав невозможна с пустым аддресом')
		
		await contract.transferOwner(acc_0, { from: owner })
		await contract.confirmOwner({ from: acc_0 })
    })

    
}
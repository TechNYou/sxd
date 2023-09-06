import { ethers } from 'hardhat';
import { Contract } from 'ethers';
import { expect } from 'chai';

describe('ExampleSupplyChain Contract', function () {
  let exampleSupplyChain: Contract;

  beforeEach(async function () {
    const ExampleSupplyChain = await ethers.getContractFactory('ExampleSupplyChain');
    exampleSupplyChain = await ExampleSupplyChain.deploy();
  });

  it('should create a lot', async function () {
    const tx = await exampleSupplyChain.createLot(
      'Type1',
      '100',
      'Operator123',
      'Origin456',
      'LotNo789',
      'TransporterXYZ'
    );

    await expect(tx)
      .to.emit(exampleSupplyChain, 'CreateLotEvent')
      .withArgs('Type1', '100', 'Operator123', 'Origin456', 'LotNo789', 'TransporterXYZ');
  });

  it('should register first process', async function () {
    const tx = await exampleSupplyChain.registerFirstProcess(
      'LotNos123',
      'Operator456',
      'Machine789',
      'ProcessingHouseXYZ',
      '123456789'
    );

    await expect(tx)
      .to.emit(exampleSupplyChain, 'FirstProcessEvent')
      .withArgs('LotNos123', 'Operator456', 'Machine789', 'ProcessingHouseXYZ', '123456789', '1');
  });

  it('should register second process', async function () {
    const tx = await exampleSupplyChain.registerSecondProcess('1', 'Machine123', 'Operator456', 'OutputLot789');

    await expect(tx)
      .to.emit(exampleSupplyChain, 'SecondProcessEvent')
      .withArgs('1', 'Machine123', 'Operator456', 'OutputLot789', '1');
  });

  it('should perform packaging', async function () {
    const tx = await exampleSupplyChain.packing('1', 'Operator123', 'Package456', '50', 'Box');

    await expect(tx)
      .to.emit(exampleSupplyChain, 'PackagingEvent')
      .withArgs('1', 'Operator123', 'Package456', '50', 'Box', '1');
  });

  it('should perform transport', async function () {
    const tx = await exampleSupplyChain.transport('Package123', 'Operator456', 'TransporterXYZ', 'Carton789');

    await expect(tx)
      .to.emit(exampleSupplyChain, 'TransportEvent')
      .withArgs('Package123', 'Operator456', 'TransporterXYZ', 'Carton789', '1');
  });
});

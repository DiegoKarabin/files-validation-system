const { expect } = require("chai");
const { upgrades } = require("hardhat");

describe("Files Validation System", function () {
	let owner, addr1, addr2, addr3, addrs;
	let Contract, contract;

	before(async function () {
		this.timeout(0);
		[owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
	});

	describe("Deployment", function () {
		it("Deploys an upgradeable agreement", async function () {
			Contract = await ethers.getContractFactory("FileValidation");
			contract = await upgrades.deployProxy(Contract, []);
			expect(await contract.owner()).to.equal(owner.address);
		});
	});

	describe("Companies", function () {
		it("Reverts if the name is empty", async function () {
			let instanceAsAddress = contract.connect(addr1)
			expect(instanceAsAddress.registerCompany('')).to.be.revertedWith("Invalid name!");
		});

		it("Users can register their company", async function () {
			let instanceAsAddress1 = contract.connect(addr1)
			instanceAsAddress1.registerCompany(`Addr${1}_Company`)
			let instanceAsAddress2 = instanceAsAddress1.connect(addr2)
			instanceAsAddress2.registerCompany(`Addr${2}_Company`)
			let instanceAsAddress3 = instanceAsAddress2.connect(addr3)
			instanceAsAddress3.registerCompany(`Addr${3}_Company`)
		});

		it("Reverts if an user already has a company", async function () {
			let instanceAsAddress = contract.connect(addr1)
			expect(instanceAsAddress.registerCompany(`Addr${1}_Company`)).to.be.revertedWith("This address already has a company registered!");
			instanceAsAddress = contract.connect(addr2)
			expect(instanceAsAddress.registerCompany(`Addr${2}_Company`)).to.be.revertedWith("This address already has a company registered!");
			instanceAsAddress = contract.connect(addr3)
			expect(instanceAsAddress.registerCompany(`Addr${3}_Company`)).to.be.revertedWith("This address already has a company registered!");
		});

		it("Owner can approve a company", async function () {
			contract.approveCompany(addr1.address);
			expect(await contract.nCompanies()).to.equal(1);
		});

		it("Owner can't approve a company twice", async function () {
			expect(contract.approveCompany(addr1.address)).to.be.revertedWith("This address already has an approved company!");
		});

	});
	
	describe("Documents", function () {
		it("Can upload documents", async function () {
			let instanceAsAddress1 = contract.connect(addr1);
			await instanceAsAddress1.uploadDocument(
				'Test Document',
				'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
				'hashhashhashhashhashhashhashhash',
				Number(new Date()),
				Number(new Date()) + 10000
			);
			expect((await contract.getDocument('hashhashhashhashhashhashhashhash')).ownerAddress).to.equal(addr1.address);
		});
	});
});
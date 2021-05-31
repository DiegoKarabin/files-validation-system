// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";

/// @title  ERC1155 marketplace for the EYSS Academy Solidity Course 
/// @author Juan Miguel Sanchez M., José Daniel Perez, Diego Karabin
/// @notice Stores and validates information from PDFs stored on IPFS
contract FileValidation is OwnableUpgradeable {
	using SafeMathUpgradeable for uint256;

	struct document {
		string name;
		string ipfsAddress;
		uint startDate;
		uint endDate;
		uint storedDate;
		address ownerAddress;
	}

	struct company {
		string name;
		bool accepted;
	}

	mapping(address => company) private companyIndex;
	mapping(address => string) public companyNames;

	address[] public approvedCompanies;

	mapping(string => document) public documents;

	event uploadedDocument(string ipfsAddress, address owner);
	event rejectedCompany(address owner);
	event registeredCompany(address owner, string name);

	/// @notice Upgradeable Contract Initizializer
	function initialize() public initializer {
		OwnableUpgradeable.__Ownable_init();
	}

	/// @notice Stores a company name on the system
	/// @param _companyName The Name of the Company to be registered
	function registerCompany(string calldata _companyName) public {
		require(keccak256(abi.encodePacked(_companyName)) != keccak256(abi.encodePacked((''))), 'Invalid name!');
		require(keccak256(abi.encodePacked(companyIndex[msg.sender].name)) == keccak256(abi.encodePacked((''))), 'This address already has a company registered!');
		require(!(companyIndex[msg.sender].accepted), 'This address already has an approved company!');
		company storage newCompany = companyIndex[msg.sender];
		newCompany.name = _companyName;
		emit registeredCompany(msg.sender, _companyName);
	}

	/// @notice The length of the approved companies array
	function nCompanies() public view returns (uint) {
		return approvedCompanies.length;
	}

	/// @notice Approves a company
	/// @param _company		Address of the company's owner
	function approveCompany(address _company) public onlyOwner {
		require(keccak256(abi.encodePacked(companyIndex[_company].name)) != keccak256(abi.encodePacked('')), 'This company is invalid!');
		require(!(companyIndex[_company].accepted), 'This address already has an approved company!');
		companyIndex[_company].accepted = true;
		approvedCompanies.push(_company);
	}

	/// @notice Store information about a document on IPFS
	/// @param  _name			Document Name
	/// @param  _ipfsAddress	Hash from IPFS
	/// @param  _dataHash		Document's hash
	/// @param  _startDate		Start Date
	/// @param  _endDate		Expiration Date
	function uploadDocument(string calldata _name, string calldata _ipfsAddress, string calldata _dataHash, uint _startDate, uint _endDate) public {
		require(keccak256(abi.encodePacked(companyIndex[msg.sender].name)) != keccak256(abi.encodePacked('')), 'This company is invalid!');
		require(companyIndex[msg.sender].accepted, "This company hasn't been approved!");
		require(keccak256(abi.encodePacked(documents[_dataHash].name)) == keccak256(abi.encodePacked('')), "This document has already been uploaded!");
		document storage newDocument = documents[_dataHash];
		newDocument.name = _name;
		newDocument.ipfsAddress = _ipfsAddress;
		newDocument.startDate = _startDate;
		newDocument.endDate = _endDate;
		newDocument.ownerAddress = msg.sender;
	}

	/// @notice Get the document's info using the document's datahash
	/// @param  _dataHash	Document Name
	/// @return Document's info
	function getDocument(string calldata _dataHash) public view returns(document memory) {
		//require(keccak256(abi.encodePacked(documents[_dataHash].name)) != keccak256(abi.encodePacked('')), "This document does not exist!");
		document memory queriedDocument = documents[_dataHash];
		return queriedDocument;
	}
}

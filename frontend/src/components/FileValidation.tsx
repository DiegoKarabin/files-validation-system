import { useContext, useEffect, useState } from 'react';
import { FileValidationContext } from "./../hardhat/SymfoniContext";
import md5 from 'md5';

interface Props { }

export const FileValidator: React.FC<Props> = () => {
	const fileValidator = useContext(FileValidationContext)
	const [documentTitle, setDocumentTitle] = useState("");
	const [ipfsAddress, setIPFSAddress] = useState("");
	const [documentData, setDocumentData] = useState([]);
	const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
	const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
	const [ownerAddress, setOwnerAddress] = useState('');

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.request({ method: 'eth_requestAccounts' }).then((value:[string]) => setOwnerAddress(value[0]));
		}
	}, [])

	useEffect(() => {
		const doAsync = async () => {
			if (!fileValidator.instance) return
			console.log("FileValidator is deployed at ", fileValidator.instance.address)
			//setMessage(await fileValidator.instance.greet())
		};
		doAsync();
	}, [fileValidator])

	return <div className='row px-5'>
		<div className='col-12 text-start'>
			<label className='form-control-label'> Document Title: </label>
			<input className='form-control' value={documentTitle} onChange={e => setDocumentTitle(e.target.value)} />
		</div>
		<div className='col-12 text-start'>
			<label className='form-control-label'> File </label>
			<input className='form-control' type='file' onChange={e => {
				if (e && e.target && e.target.files)
				{
					let fileReader = new FileReader();
					fileReader.onload = (ev:any) => setDocumentData(ev.target.result);
					fileReader.readAsArrayBuffer(e.target.files[0]);
				}
			}} />
		</div>
		<div className='col-12 text-start'>
			<label className='form-control-label'> IPFS Address </label>
			<input className='form-control' disabled value={ipfsAddress} onChange={e => setIPFSAddress(e.target.value)} />
		</div>
		<div className='col-12 text-start'>
			<label className='form-control-label'> Document Hash </label>
			<input className='form-control' disabled value={md5(documentData)} />
		</div>
		<div className='col-12 text-start'>
			<label className='form-control-label'> Start Date </label>
			<input className='form-control' type='date' value={startDate} onChange={e => setStartDate(e.target.value)} />
		</div>
		<div className='col-12 text-start'>
			<label className='form-control-label'> End Date </label>
			<input className='form-control' type='date' value={endDate} onChange={e => setEndDate(e.target.value)} />
		</div>
		<div className='col-12 text-start'>
			<label className='form-control-label'> Owner </label>
			<input className='form-control' disabled value={ownerAddress} onChange={e => setOwnerAddress(e.target.value)} />
		</div>
	</div>
}
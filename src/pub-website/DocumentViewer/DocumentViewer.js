import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import axios from 'axios';


pdfjs.GlobalWorkerOptions.workerSrc = import(
    "pdfjs-dist/build/pdf.worker.entry"
);
const MyApp = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfFile, setPdfFile] = useState([]);
    const [pdfFileUrl, setPdfFileUrl] = useState({});

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }
    useEffect(() => {
        // getFile()
        setPdfFileUrl({ url: 'http://example.com/sample.pdf' })
    }, []);

    const getFile = () => {
        // axios.get('http://localhost:5000/api/file/showfile').then(response =>
        //     (response.status === 200 ? response.data : null))
        //     .then(pdfdata => {
        //         debugger
        //         var len = pdfdata.length;
        //         var bytes = new Uint8Array(len);
        //         for (var i = 0; i < len; i++) {
        //             bytes[i] = pdfdata.charCodeAt(i);
        //         }
        //         const renderPdf = bytes.buffer
        //         setPdfFile(renderPdf);
        //     })
        axios.get('http://localhost:5000/api/file/showfile').
            then(res => {
                console.log(res)
                debugger
                var len = res.data.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = res.data.charCodeAt(i);
                }
                const renderPdf = bytes.buffer
                setPdfFile(renderPdf);

                //  var file = new Blob([data], { type: 'application/pdf' });
                // var fileURL = URL.createObjectURL(file);
                // window.open(fileURL);
            })

    }

    // downloadImage(key: string) {
    //     this.userInteractionService.downloadImage(key)
    //         .subscribe(data => this.downloadFile(data)),//console.log(data),
    //         error => console.log('Error downloading the file.'),
    //         () => console.info('OK');
    // }
    // downloadImageV2(key: string) {
    //     this.userInteractionService.downloadFilev(key)
    //         .subscribe((resp: any) => {
    //             this.downloadFileV2(resp, key);
    //         });
    // }
    // downloadFile(data: any) {
    //     const blob = new Blob([data], { type: 'jpg' });
    //     const url = window.URL.createObjectURL(blob);
    //     window.open(url);
    // }
    // downloadFileV2(response: any, key: any) {
    //     let dataType = response.type;
    //     let binaryData = [];
    //     binaryData.push(response);
    //     let downloadLink = document.createElement('a');
    //     downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
    //     this.waitingImage = false;
    //     downloadLink.setAttribute('download', "");
    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();
    // }

    return (
        <div>
            {/* <iframe src='http://localhost:5000/api/file/showfile' />
            'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', */}
            <Document
                file={{ fileUrl: 'http://localhost:5000/api/file/showfile' }}
                options={{ workerSrc: "/pdf.worker.js" }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    );
}

export default MyApp
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateRegistry {
    struct Certificate {
        string studentName;
        string registerNumber;
        string course;
        string year;
        string pdfHash;
        uint256 issuedAt;
    }

    mapping(string => Certificate) private certificates;

    event CertificateIssued(string registerNumber, string pdfHash);

    function issueCertificate(
        string memory _studentName,
        string memory _registerNumber,
        string memory _course,
        string memory _year,
        string memory _pdfHash
    ) public {
        certificates[_registerNumber] = Certificate({
            studentName: _studentName,
            registerNumber: _registerNumber,
            course: _course,
            year: _year,
            pdfHash: _pdfHash,
            issuedAt: block.timestamp
        });

        emit CertificateIssued(_registerNumber, _pdfHash);
    }

    function verifyCertificate(string memory _registerNumber)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        Certificate memory c = certificates[_registerNumber];
        return (
            c.studentName,
            c.registerNumber,
            c.course,
            c.year,
            c.pdfHash,
            c.issuedAt
        );
    }
}

const data = [
    {
        memberId: 'hyunmui@outlook.kr',
        password: 'qwe12#',
        name: '선현민',
        nickname: 'hyunmui',
    },
    {
        memberId: 'john@dimigo.com',
        password: 'qwe12#',
        name: '존',
        nickname: 'john',
    },
    {
        memberId: 'kevin@dimigo.com',
        password: 'qwe12#',
        name: '케빈',
        nickname: 'kevin',
    },
];

module.exports = {
    getMember: (memberId) => data.find((m) => m.memberId === memberId),
};

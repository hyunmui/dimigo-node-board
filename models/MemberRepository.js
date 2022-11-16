const data = [
    {
        memberId: 'hyunmui@outlook.kr',
        password: 'qwe12#',
        name: '선현민',
    },
];

module.exports = {
    getMember: (memberId) => data.find((m) => m.memberId === memberId),
};

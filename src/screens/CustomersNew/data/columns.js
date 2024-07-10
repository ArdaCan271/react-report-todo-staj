/** @type import('@tanstack/react-table').ColumnDef<any>*/
const columns = [
  {
    header: 'Cari Kod',
    accessorKey: 'CariKod',
    filterFn: 'includesString'
  },
  {
    header: 'İsim',
    accessorKey: 'Isim',
    filterFn: 'includesString'
  },
  {
    header: 'Telefon',
    accessorKey: 'Telefon',
    filterFn: 'includesString'
  },
  {
    header: 'Adres',
    accessorKey: 'Adres',
    filterFn: 'includesString'
  },
  {
    header: 'İlçe',
    accessorKey: 'Ilce',
    filterFn: 'includesString'
  },
  {
    header: 'İl',
    accessorKey: 'Il',
    filterFn: 'includesString'
  },
  {
    header: 'Ülke',
    accessorKey: 'Ulke',
    filterFn: 'includesString'
  },
  {
    header: 'Vergi Dairesi',
    accessorKey: 'VergiDairesi',
    filterFn: 'includesString'
  },
  {
    header: 'Vergi No',
    accessorKey: 'VergiNo',
    filterFn: 'includesString'
  },
  {
    header: 'Borç',
    accessorKey: 'Borc',
    filterFn: 'includesString'
  },
  {
    header: 'Alacak',
    accessorKey: 'Alacak',
    filterFn: 'includesString'
  },
  {
    header: 'Bakiye',
    accessorKey: 'Bakiye',
    filterFn: 'includesString'
  },
  {
    header: 'Çek Bakiye',
    accessorKey: 'CekBakiye',
    filterFn: 'includesString'
  },
  {
    header: 'Senet Bakiye',
    accessorKey: 'SenetBakiye',
    filterFn: 'includesString'
  },
  {
    header: 'Cari Risk',
    accessorKey: 'CariRisk',
    filterFn: 'includesString'
  },
  {
    header: 'Sipariş Tutar',
    accessorKey: 'SiparisTutar',
    filterFn: 'includesString'
  },
  {
    header: 'Sipariş Teslim Tutar',
    accessorKey: 'SiparisTeslimTutar',
    filterFn: 'includesString'
  },
  {
    header: 'Kalan Sipariş Tutar',
    accessorKey: 'KalanSiparisTutar',
    filterFn: 'includesString'
  },
  {
    header: 'Kapatılmış Sipariş Tutar',
    accessorKey: 'KapatilmisSiparisTutar',
    filterFn: 'includesString'
  },
  {
    header: 'E-mail',
    accessorKey: 'Email',
    filterFn: 'includesString'
  }
]

export default columns;

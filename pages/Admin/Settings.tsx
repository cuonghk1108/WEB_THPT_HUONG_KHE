import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Lock, Globe, Upload } from 'lucide-react';
import { useData } from '../../context/DataContext';
// import { cloudStorage } from '../../services/cloudStorage';

const Settings: React.FC = () => {
  const { globalImages, news, teachers, clubs, gallery, studentCorner, achievementYears, digitalLibrary, studentPortal } = useData();
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const handleSyncToBin = async () => {
    setSyncing(true);
    setSyncMessage('');
    try {
      const dataToSync = {
        globalImages,
        news,
        teachers,
        clubs,
        gallery,
        studentCorner,
        achievementYears,
        digitalLibrary,
        studentPortal,
      };
      const success = await cloudStorage.saveData(dataToSync);
      if (success) {
        setSyncMessage('✅ Đồng bộ thành công lên JSONBin!');
      } else {
        setSyncMessage('❌ Đồng bộ thất bại, kiểm tra API key.');
      }
    } catch (error) {
      setSyncMessage('❌ Lỗi: ' + (error instanceof Error ? error.message : 'Không rõ'));
    } finally {
      setSyncing(false);
    }
  };
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-slate-900">Cấu hình Hệ thống</h1>
        <p className="text-slate-600 text-sm font-medium">Điều chỉnh các thiết lập chung cho website.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Globe className="h-5 w-5 text-primary-600" /> Thông tin chung
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Tên website</label>
                    <input type="text" disabled value="THPT Hương Khê" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-600 text-sm cursor-not-allowed" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Email liên hệ</label>
                    <input type="email" disabled value="c3huongkhe@hatinh.edu.vn" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-600 text-sm cursor-not-allowed" />
                </div>
            </div>
        </div>

        {/* Security */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Lock className="h-5 w-5 text-red-600" /> Bảo mật
            </h3>
             <div className="space-y-4">
                 <button className="w-full py-2 px-4 border border-slate-300 rounded text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                     Đổi mật khẩu Admin
                 </button>
                 <button className="w-full py-2 px-4 border border-slate-300 rounded text-slate-700 font-bold hover:bg-slate-50 transition-colors">
                     Xem nhật ký hoạt động
                 </button>
             </div>
        </div>

        {/* Cloud Sync */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Upload className="h-5 w-5 text-blue-600" /> Đồng bộ dữ liệu
            </h3>
            <div className="space-y-4">
                <p className="text-sm text-slate-600">Đẩy tất cả dữ liệu hiện tại lên JSONBin để sao lưu.</p>
                <button
                  onClick={handleSyncToBin}
                  disabled={syncing}
                  className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 text-white font-bold rounded transition-colors"
                >
                  {syncing ? 'Đang đồng bộ...' : 'Đồng bộ lên JSONBin'}
                </button>
                {syncMessage && (
                  <p className={`text-sm p-2 rounded ${syncMessage.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {syncMessage}
                  </p>
                )}
            </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 opacity-50">
             <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Bell className="h-5 w-5 text-yellow-600" /> Thông báo (Sắp ra mắt)
            </h3>
             <div className="space-y-3">
                 <div className="flex items-center justify-between">
                     <span className="text-sm text-slate-700">Gửi email khi có tin mới</span>
                     <div className="w-10 h-5 bg-slate-200 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div></div>
                 </div>
                 <div className="flex items-center justify-between">
                     <span className="text-sm text-slate-700">Thông báo hệ thống</span>
                     <div className="w-10 h-5 bg-primary-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div></div>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
